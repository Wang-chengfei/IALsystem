package bin.com;

import javax.servlet.ServletContext;
import java.util.Calendar;
import java.util.TimerTask;

public class DailyFresh extends TimerTask {
    private static final int C_SCHEDULE_HOUR = 0;
    private static boolean isRunning = false;
    private ServletContext context = null;


    public DailyFresh() {
    }
    public DailyFresh(ServletContext context) {
        this.context = context;
    }

    @Override
    public void run() {

        Calendar cal = Calendar.getInstance();
        if (!isRunning) {
            if (C_SCHEDULE_HOUR == cal.get(Calendar.HOUR_OF_DAY)) {
                isRunning = true;
                context.log("开始执行指定任务");

                RandomEnWordNumber.fresh();


                isRunning = false;
                context.log("指定任务执行结束");
            }
        }
        else {
            context.log("上一次任务执行还未结束");
        }

    }




}
