package bin.com;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import jdbc.jdbcUtils.JdbcUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet({"/get/enword","/load/enword"})
public class EnWordReactor extends Reactor {
    private String openid;
    private int startNumber;
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
    private String EnglishLevel;
    private int number_Enword;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req,resp);
        openid = super.getOpenid();
        startNumber = RandomEnWordNumber.getRandomNumber();

        User user = new User(openid);
        EnglishLevel = user.getLevel();
        number_Enword = user.getNumber();
        String s = getWords();

        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print(s);
        out.flush();
        out.close();


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


    }



    private String getWords() {
        Gson gson = new Gson();
        JsonArray jsonArray = new JsonArray();
        int total;
        int id;
        String sql;
        switch (EnglishLevel){
            case ("cet4"):
                total = 3739;
                sql= "select word from cet4 where id=?";
                break;
            case ("cet6"):
                total = 2078;
                sql= "select word from cet6 where id=?";
                break;
            case ("kaoyan"):
                total = 4533;
                sql= "select word from kaoyan where id=?";
                break;
            default:
                total = 1000;
                sql= "select word from cet4 where id=?";
        }
        System.out.println(startNumber);
        for (int i = 0; i < number_Enword; i++) {
            id = (startNumber + i) % total + 1;
            Map map = template.queryForMap(sql, id);
            jsonArray.add(map.get("word").toString());
        }

        return gson.toJson(jsonArray);
    }




}
