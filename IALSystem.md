#### 用户的存储的数据

- 用户可以修改该部分的数据（openid不可修改）
- openid在用户登录时可以获取，openid可以唯一标记用户

```json
"openid":"...",  //一串字符
 "task": [
        {
            "summary": "写报告",  //摘要
            "details": "写报告写报告写报告写报告写报告写报告",  //详情
            "deadline": "2020-05-30",  //截止时间
            "difficultyLevel": 3,  //难度
            "importanceLevel": 4,  //重要程度
            "completed": false  //是否完成
        }
    ],
    "plan": [
        {
            "type": 0,  //计划类型  0-短期计划（不重复） 1-长期计划（有重复）
            "summary": "写报告",  //摘要
            "remark": "今天要完成",  //计划备注
            "time": {  //依据计划类型（type）的不同，计划的时间（time）相应改变
                "startTime": "2020-05-01",  //若是短期计划（不重复），计划的时间仅有开始时间和结束时间
                "endTime": "2020-05-01"
            }
        },
        {
            "type": 1,  //长期计划（重复）
            "summary": "背单词",  //摘要
            "remark": "每天坚持",  //备注
            "time": {
                "repetitionType": 0  //长期计划有重复类型 0-每天重复 1-按周重复 2-按月重复
                					 //依据重复类型（repetitionType）的不同,time内容相应改变
                					 //这是每天重复
            }
        },
        {
            "type": 1,  //长期计划
            "summary": "运动",
            "remark": "每周末去打球",
            "time": {
                "repetitionType": 1,  //长期计划重复类型 1-按周重复
                "repetitionTime": [
                    6,  //数字为一周内那几天重复
                    7
                ]
            }
        },
        {
            "type": 1,  //长期计划
            "summary": "旅游",
            "remark": "每月1号，30号去旅游",
            "time": {
                "repetitionType": 2,  //长期计划重复类型 2-按月重复
                "repetitionTime": [
                    1,  //数字为一个月内那几天重复
                    30
                ]
            }
        }
    ],
    "course": [
        {
            "name": "微积分(1)-1",  //课程名
            "teacher": "李挺",  //授课老师
            "startWeek": 2,  //开始周
            "endWeek": 18,  //结束周
            //以上为一门课的基本信息
            
            "section": [   //section 为一门课上课的具体时间地点，由于一门课可能一周有多个上课时间段，因此section是个数组
                {
                    "location": "江安综合楼C座C306",  //地点
                    "weekTime": 3,  //上课周数（周几上课）
                    "startLesson": 1,  //开始节次
                    "endLesson": 2  //结束节次
                },
                {
                    "location": "江安综合楼C座C504",
                    "weekTime": 5,
                    "startLesson": 5,
                    "endLesson": 6
                }
            ]
        }
    ],
    "firstWeekTime": "2020-02-24",  //本学期第一周的周一时间，用于确定当前周
    "classTime": [  //节次时间
        {
            "id": 1,  //节次
            "startTime": "08:15",  //开始时间
            "endTime": "09:00"  //结束时间
            //以上第一个数组表示第一节课的上课时间为8：15-9：00
        },
        {
            "id": 2,
            "startTime": "9:10",
            "endTime": "10:00"
        }
    ]
```

#### 外部的数据库

- 用户不可修改该部分数据

```json
"enWord": [  //英语单词
        {
            "word": "well",  //单词
            "meanings": [  //意思（可能一个单词有多个意思，故为数组）
                {
                    "property": "adv",  //词性
                    "meaning": "很好地，充分地"  //具体意思
                },
                {
                    "property": "n",
                    "meaning": "井"
                }
            ],
            "phrases": [  //短语（数组）
                {
                    "phrase": "as well as",  //短语
                    "meaning": "同样地；也"  //短语意思
                },
                {
                    "phrase": "do well",
                    "meaning": "做得好"
                }
            ],
            "sentences": [  //例句（数组）
                "You did well"  //具体例句
            ]
        }
    ],
    "chickenSoup": [  //心灵鸡汤（数组）
        "有目标的人生才有方向，有规划的人生才更精彩。",
        "当走过了曾经隐忍的年月再回首时，我才发现，曾经觉得难以启齿的往事，都不过是沧海一粟，生命给予我的，不是那些艰难，而是成长，是学会举重若轻，是将曾经无法释怀的那些过往，统统放下。"
    ],
    "image": [  //励志图片（数组）
        "url"  //图片路径
    ]
```

