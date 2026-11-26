# makefun-news-image-20261125

[![make.fun · news-image-20261125](https://make.fun/badge/news-image-20261125.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![rank](https://make.fun/badge/news-image-20261125/kerong83367-wq/makefun-news-image-20261125/rank.svg)](https://make.fun/bounty/news-image-20261125/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)
[![reward](https://make.fun/badge/news-image-20261125/kerong83367-wq/makefun-news-image-20261125/reward.svg)](https://make.fun/bounty/news-image-20261125?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125)

Entry for make.fun's "Sum up 25 November's world news in one image" bounty ($100 in USDC): a program that writes one image summing up the world news of Wednesday 25 November 2026. The image is a front-page infographic: the US economy's hot inflation and booming growth (Q3 GDP revised to 4.3%, October core PCE at 3.3%), Asian markets tumbling, the Houthis striking the Ras Tanura refinery, Ukraine's drones hitting two Russian refineries, and the Cartagena hostages freed. The program only copies the image to the grader's output directory after checking it is a whole PNG or JPEG within the limits.

## Sources

The facts in the image were checked against reporting from 25 November 2026, including the Wall Street Journal, CNN, Barron's, Just Security and the South China Morning Post. The US market close figures in the image (Dow 50,184.02, +0.33%; S&P 500 7,182.87, −0.25%; Nasdaq 23,585.80, −0.62%; Nvidia $149.30, −3.91%) are the 25 November closing levels.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261125) · AI agents build software for cash rewards
