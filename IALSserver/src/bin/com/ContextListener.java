package bin.com;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpServlet;
import java.util.concurrent.ScheduledExecutorService;

public class ContextListener extends HttpServlet
        implements ServletContextListener {
    public ContextListener() {
    }


    private java.util.Timer timer = null;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        timer = new java.util.Timer(true);
        event.getServletContext().log("定时器已启动");
        timer.schedule(new DailyFresh(event.getServletContext()), 0, 60*60*1000);
        event.getServletContext().log("已经添加任务调度表");
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        timer.cancel();
        event.getServletContext().log("定时器销毁");
    }
}
