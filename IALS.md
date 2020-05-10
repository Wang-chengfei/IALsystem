# Intelligence-Assisted Learning System

# **学习辅助系统**-概述





**功能描述：文件管理，课程表，时间安排，任务提示，每日英语单词，自定义座右铭。**





## 主界面：

### ***tabBar***：主页，设置；

 

#### 一．Page主页：

> Image座右铭

> Viewer 每日单词

> Viewer 任务提示

> Icons(button)  docs文件、timeTable时间表、assignment任务

 


#### 二．Page设置：

> Image 头像

> Text 名称

> List 各种设置的跳转列表

> Footer 注脚







# Pages：

-----



- **mainPage**:主页，绑定tabBar的第一个icon，元素见上

  - **Image** 座右铭
  - **Viewer** 每日单词
  - **Viewer** 任务提示
  - **Icon(button)**  docs文件
  - **Icon(button)**  timeTable时间表
  - **Icon(button)**  assignment任务

  

- ##### settingPage:设置页

  - **Image** 头像
  - **settingMotto:**
  - **settingTimeTable:**
  - **settingAssignment:**
  - **settingEnglishWords:**



- **assignmentEditPage**: 绑定任务icon,罗列所有任务，可添加任务，完成任务，清空已完成任务
  - **List of assignment**（*自定义组件*）*包括任务概述，可展开具体内容，根据当前紧急程度以不同醒目程度（颜色：**红、黄、绿**）显示，已完成任务以不醒目的形式按照时间排序罗列在未完成任务下方。
  - **icon** 清空已完成任务历史
  - **Icon** 新建任务
    - **addNewAssignmentPage**: 输入任务概述，输入具体内容，设定截止日期，标记重要程度，标记难度来新建任务，绑定icon新建任务



- **timeTablePage**:默认按照时间顺序显示当日事项（开始时间、结束时间、概述、备注）；可查看完整的一周表单，可在选择日期查看对应日期内的任务；可添加事项，且表中为空时提示用户添加事项；。
  - **List of items**：课程和计划
  - **addNewItemPage**:添加新事项：选择事项类型（使用原生选择框，默认计划）
    - **item**(自定义组件):事项的类型（课程or计划，使用原生选择框，默认计划）
      - 课程：概述（课程名）、备注、开始周和结束周、开始时间和结束时间。
      - 计划：概述、备注、优先级（高于课程或低于课程）、类型（长期计划or近期计划）
      - 长期计划：重复（使用复选框，每周X，每月X号，逻辑或），开始时间和结束时间。
      - 近期计划：重复次数（默认1），每段计划对应一个日期，开始时间和结束时间。






