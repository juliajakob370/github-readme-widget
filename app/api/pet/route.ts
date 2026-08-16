import { getGitHubStats } from "@/lib/github";
import { getPetState } from "@/lib/pet";
import { ASSETS } from "@/lib/assets";

export async function GET() {
    try {
        const stats = await getGitHubStats("juliajakob370");
        const pet = getPetState(stats.currentStreak);

        const svg = `
        <svg
          width="400"
          height="400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            href="${pet.asset}" 
            x="150"
            y="150"
            width="250"
            height="250"
          />
          <image
            href="${ASSETS.box}"
            x="10"
            y="45"
            width="300"
            height="160"
          />
          <text
            x="60"
            y="90"
            fill="#32521D"
            font-size="25"
            font-weight="bold"
            font-family="Courier, monospace"
            letter-spacing="1"
          >
            COMMIT STREAK
          </text>
          <text
            x="100"
            y="160"
            fill="#32521D"
            font-family="Courier, monospace"
          >
            <tspan font-size="70" font-weight="bold"> 
              ${stats.currentStreak}
            </tspan>

            <tspan font-size="20" font-weight="bold">
              DAYS
            </tspan>
          </text>
        </svg>
        `;

        return new Response(svg, {
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "public, max-age=1800, s-maxage=7200, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        // Return a fallback SVG if the GraphQL request or logic fails
        const errorSvg = `
        <svg width="400" height="100" xmlns="http://www.w3.org/2000/svg">
          <text x="20" y="50" fill="red" font-family="sans-serif">Error loading GitHub Pet stats</text>
        </svg>
        `;
        return new Response(errorSvg, {
            status: 200,
            headers: {
                "Content-Type": "image/svg+xml",
                "Cache-Control": "no-cache",
            },
        });
    }
}