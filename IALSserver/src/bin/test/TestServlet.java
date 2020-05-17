package bin.test;


import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

@WebServlet(name = "myUserServlet",
        urlPatterns = "/user/test",
        loadOnStartup = 1,
        initParams = {
                @WebInitParam(name="name", value="小明"),
                @WebInitParam(name="pwd", value="123456")
        }
)
public class TestServlet extends HttpServlet {
    private static final long serialVersionUID = 7109220574468622594L;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        System.out.println("servlet初始化...");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.setCharacterEncoding("utf-8");
        PrintWriter pw = response.getWriter();

        pw.append("Hello Servlet!<br>" );

        //servletName
        pw.append("servletName：" + getServletName() + "<br>");

        //initParam
        ServletConfig servletConfig = this.getServletConfig();
        Enumeration<String> paramNames = servletConfig.getInitParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = paramNames.nextElement();
            pw.append(paramName + "：" + servletConfig.getInitParameter(paramName) + "<br>");
        }

        pw.close();

    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
