package bin.com;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.WebEndpoint;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet({"/update/user","/load/user"})
public class UserReactor extends Reactor {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
        User user = new User(super.getOpenid());
        String column = super.getQuery().get("column").getAsString();
        String answer;
        switch (column) {
            case ("EnglishLevel"):
                user.updateEnglishLevel(super.getQuery().get("data").getAsString());
                answer = "successfully update EnglishLevel!";
                break;
            case ("number_Enword"):
                user.updateNumber_Enword(super.getQuery().get("data").getAsString());
                answer = "successfully update number_Enword!";
                break;
            default:
                answer = "there is no such column,please add new column";
                break;
        }
        PrintWriter out = resp.getWriter();
        out.print(answer);
        out.flush();
        out.close();
    }
}
