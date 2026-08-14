import { ASSETS } from "@/lib/assets";

export function getPetState(commits: number) { //export makes this func available to other files
    if (commits === 0) {
        return {
            asset: ASSETS.sleepingFrog,
        };
    }

    return {
        asset: ASSETS.awakeFrog,
    };
}