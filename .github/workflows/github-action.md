# Github Action 使用教學

[Github Action](https://docs.github.com/cn/actions) 是一種 CI / CD 工具 , 可用於自動化測試 & 自動化打包 / 部屬

## 基本知識

- [trigger](https://docs.github.com/cn/actions/reference/events-that-trigger-workflows) - 觸發 Action 執行 Job 的時機
- [job](https://docs.github.com/cn/actions/learn-github-actions/migrating-from-gitlab-cicd-to-github-actions#jobs) - 觸發後 , 需要執行的工作

[![](https://docs.github.com/assets/images/help/images/overview-actions-design.png)](https://docs.github.com/cn/actions/learn-github-actions/introduction-to-github-actions)

## 目前專案使用

目前專案在 web 部分使用 手動建置( workflow_dispatch ) 的模式 , 發佈到 [gh-page](https://andrew781026.github.io/D-D_read_book_meeting/) 

如果需要 deploy 新的 web 頁面 , 請到 [Web-CI 頁面執行](https://github.com/andrew781026/D-D_read_book_meeting/actions?query=workflow%3AWeb-CI) 

![Web-CI 頁面執行](https://i.imgur.com/iPG1Wdo.png)

---

其他部分 , 可由各位工程師補充不足之處 ☺