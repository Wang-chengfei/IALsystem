var course = [{
    name: "微积分",
    teacher: "邓荣春",
    startWeek:1,
    endWeek:17,
    section: [{
        location: "江安一教B105",
        weekTime: 1,
        startLesson:5,
        endLesson:7
      },
      {
        location: "江安一教B203",
        weekTime: 4,
        startLesson:8,
        endLesson:9
      }
    ]
  },
  {
    name: "大学英语（口语）",
    teacher: "Austin",
    startWeek:1,
    endWeek:17,
    section: [{
      location: "江安一教A208",
      weekTime: 1,
      startLesson:2,
      endLesson:2
    }]
  },
  {
    name: "概率统计",
    teacher: "常寅山",
    startWeek:1,
    endWeek:17,
    section: [{
        location: "江安一教B503",
        weekTime: 1,
        startLesson:8,
        endLesson:9
      },
      {
        location: "江安一教B504",
        weekTime: 3,
        startLesson:8,
        endLesson:9
      }
    ]
  },
  {
    name: "中国近代史纲要",
    teacher: "付志刚",
    startWeek:1,
    endWeek:17,
    section: [{
      location: "江安一教B104",
      weekTime: 1,
      startLesson:10,
      endLesson:11
    }]
  },
  {
    name: "面向对象程序设计导论",
    teacher: "舒莉",
    startWeek:1,
    endWeek:13,
    section: [{
      location: "江安一教A105",
      weekTime: 2,
      startLesson:1,
      endLesson:4
    }]
  },
  {
    name: "实验室安全与环境保护",
    teacher: "何柳",
    startWeek:3,
    endWeek:11,
    section: [{
      location: "江安灾后重建于管理学院A403",
      weekTime: 2,
      startLesson:5,
      endLesson:6
    }]
  },
  {
    name: "大学物理",
    teacher: "杨斌",
    startWeek:1,
    endWeek:17,
    section: [{
      location: "江安一教B304",
      weekTime: 2,
      startLesson:8,
      endLesson:9
    }]
  },
  {
    name: "军事理论",
    teacher: "龚燕",
    startWeek:1,
    endWeek:9,
    section: [{
      location: "江安综合楼C204",
      weekTime: 2,
      startLesson:10,
      endLesson:11
    }]
  },
  {
    name: "大学物理实验",
    teacher: "王维果",
    startWeek:9,
    endWeek:16,
    section: [{
      location: "江安一教A105",
      weekTime: 3,
      startLesson:1,
      endLesson:4
    }]
  },
  {
    name: "数字逻辑",
    teacher: "应三丛",
    startWeek:1,
    endWeek:16,
    section: [{
      location: "江安一教A106",
      weekTime: 3,
      startLesson:5,
      endLesson:7
    }]
  },
  {
    name: "大学英语",
    teacher: "任军",
    startWeek:1,
    endWeek:17,
    section: [{
      location: "江安二级楼B语音17",
      weekTime: 4,
      startLesson:3,
      endLesson:4
    }]
  },
  {
    name: "体育",
    teacher: "易小东",
    startWeek:1,
    endWeek:17,
    section: [{
      location: "江安体育场2号",
      weekTime: 4,
      startLesson:5,
      endLesson:6
    }]
  },
  {
    name: "计算机辅助三维参数化设计",
    teacher: "许晨伟",
    startWeek:2,
    endWeek:13,
    section: [{
      location: "江安一教B102",
      weekTime: 4,
      startLesson:10,
      endLesson:12
    }]
  },
  {
    name: "形势与政策",
    teacher: "方智阳",
    startWeek:11,
    endWeek:17,
    section: [{
      location: "江安综合楼C306",
      weekTime: 5,
      startLesson:5,
      endLesson:6
    }]
  }
];
var classTime = [
  {
    id:1,
    startTime:"08:15",
    endTime:"09:00"
  },
  {
    id:2,
    startTime:"09:10",
    endTime:"09:55"
  },
  {
    id:3,
    startTime:"10:15",
    endTime:"11:00"
  },
  {
    id:4,
    startTime:"11:10",
    endTime:"11:55"
  },
  {
    id:5,
    startTime:"13:50",
    endTime:"14:35"
  },
  {
    id:6,
    startTime:"14:45",
    endTime:"15:30"
  },
  {
    id:7,
    startTime:"15:40",
    endTime:"16:25"
  },
  {
    id:8,
    startTime:"16:45",
    endTime:"17:30"
  },
  {
    id:9,
    startTime:"17:40",
    endTime:"18:25"
  },
  {
    id:10,
    startTime:"19:20",
    endTime:"20:05"
  },
  {
    id:11,
    startTime:"20:15",
    endTime:"21:00"
  },
  {
    id:12,
    startTime:"21:10",
    endTime:"21:55"
  },
]

module.exports = {
  courses: course,
  classTimes:classTime
}