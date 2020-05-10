package bin.com;

import com.google.gson.JsonObject;

import java.util.*;

public class Task {
    private String summary;
    private String details;
    private String deadline;
    private int importanceLevel;
    private boolean completed;
    private String iconColor;
    private int tense;

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public int getImportanceLevel() {
        return importanceLevel;
    }

    public void setImportanceLevel(int importanceLevel) {
        this.importanceLevel = importanceLevel;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getIconColor() {
        return iconColor;
    }

    public void setIconColor(String iconColor) {
        this.iconColor = iconColor;
    }

    public int getTense() {
        return tense;
    }

    public void setTense(int tense) {
        this.tense = tense;
    }
            //****tense 越大越需要完成

    public Task(JsonObject jsonObject){
        summary = jsonObject.get("summary").getAsString();
        details = jsonObject.get("details").getAsString();
        deadline = jsonObject.get("deadline").getAsString();
        importanceLevel = jsonObject.get("importanceLevel").getAsInt();
        completed = jsonObject.get("completed").getAsBoolean();
        String temp=deadline;

        StringTokenizer st = new StringTokenizer(temp,"-");
        Calendar due = Calendar.getInstance();
        int year,month,date;
        year = Integer.parseInt(st.nextToken());
        month = Integer.parseInt(st.nextToken());
        date = Integer.parseInt(st.nextToken());
        due.set(year, month-1, date);
//        System.out.println(due.getTime());
        Calendar now = Calendar.getInstance();
        if (!completed){
            int left=getTimeDistance(now.getTime(),due.getTime());
            if (left<0) { left=0;  }
            tense = (importanceLevel * 5 + 20) / (left + 1);
            if (tense<5){
                iconColor = "green";
            } else if (tense < 10) {
                iconColor = "yellow";
            } else {
                iconColor = "red";
            }
        }else{
            tense = -1;
            iconColor = "gray";
        }
    }



    public static int getTimeDistance(Date beginDate , Date endDate ) {
        Calendar beginCalendar = Calendar.getInstance();
        beginCalendar.setTime(beginDate);
        Calendar endCalendar = Calendar.getInstance();
        endCalendar.setTime(endDate);
        long beginTime = beginCalendar.getTime().getTime();
        long endTime = endCalendar.getTime().getTime();
        int betweenDays = (int)((endTime - beginTime) / (1000 * 60 * 60 *24));
            //先算出两时间的毫秒数之差大于一天的天数

        endCalendar.add(Calendar.DAY_OF_MONTH, -betweenDays);
            //使endCalendar减去这些天数，将问题转换为两时间的毫秒数之差不足一天的情况

        endCalendar.add(Calendar.DAY_OF_MONTH, -1);
            //再使endCalendar减去1天

        if(beginCalendar.get(Calendar.DAY_OF_MONTH)==endCalendar.get(Calendar.DAY_OF_MONTH))
            //比较两日期的DAY_OF_MONTH是否相等
        {
            return betweenDays + 1;
        }
            //相等说明确实跨天了
        else {
            return betweenDays + 0;
            //不相等说明确实未跨天
        }
    }




}
