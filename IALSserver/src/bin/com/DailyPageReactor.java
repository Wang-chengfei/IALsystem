package bin.com;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import jdbc.jdbcUtils.JdbcUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@WebServlet("/get/dailypage")
public class DailyPageReactor extends Reactor {
    private String openid;
    private int startNumber;
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
    private int total=15;
    private int neededNumber=5;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        startNumber = RandomEnWordNumber.getRandomNumber();
        String s = this.getList();
        PrintWriter out = resp.getWriter();
        out.print(s);
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    }

    private String getList(){
        Gson gson = new Gson();
        JsonArray jsonArray = new JsonArray();
        int id;
        String sql="select * from dailypage where id = ?";
//        JsonObject jsonObject=new JsonObject();


        for (int i = 0; i <neededNumber; i++) {
            id = (startNumber + i) % total + 1;
            Map map = template.queryForMap(sql, id);
//            jsonArray.add(map.get("word").toString());
            jsonArray.add(map.get("detail").toString());
        }

        return gson.toJson(jsonArray);
    }
}
