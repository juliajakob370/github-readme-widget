export async function getGitHubStats(username: string) {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    // 1. Create a timeout controller to prevent hitting GitHub Camo's 5s limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
        const token = process.env.GITHUB_TOKEN;
        if (!token) {
            console.error("GITHUB_TOKEN is missing in environment variables.");
            return { currentStreak: 0 };
        }

        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "User-Agent": "GitHub-Profile-Pet-Widget",
            },
            body: JSON.stringify({
                query,
                variables: {
                    login: username,
                },
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error(`GitHub API responded with status ${res.status}`);
            return { currentStreak: 0 };
        }

        const json = await res.json();

        // 2. Safely check for GraphQL response errors
        if (json.errors || !json.data?.user) {
            console.error("GraphQL Query Error:", json.errors || "User not found");
            return { currentStreak: 0 };
        }

        const calendar = json.data.user.contributionsCollection.contributionCalendar;
        const days = calendar.weeks.flatMap((week: any) => week.contributionDays);

        const currentStreak = calculateCurrentStreak(days);

        return {
            currentStreak,
        };
    } catch (error) {
        clearTimeout(timeoutId);
        console.error("Failed to fetch GitHub stats:", error);
        // Fallback to 0 streak on network fail or timeout so the SVG still renders!
        return { currentStreak: 0 };
    }
}

function calculateCurrentStreak(days: any[]) {
    let streak = 0;

    // reverse the array to start from the newest day
    const reversed = [...days].reverse();

    let startIndex = 0;

    // check if there was commit activity today; if 0, start from yesterday
    if (reversed.length > 0 && reversed[0].contributionCount === 0) {
        startIndex = 1;
    }

    for (let i = startIndex; i < reversed.length; i++) {
        if (reversed[i].contributionCount > 0) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}