package bin.etc;

import bin.test.TestUser;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import jdbc.jdbcUtils.JdbcUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.servlet.annotation.WebServlet;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@WebServlet("/fresh/dailypage")
public class AddDailyPage {

    public static void main(String[] args) {
        try {
            JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
            JsonParser parser=new JsonParser();
            InputStream in = TestUser.class.getClassLoader().getResourceAsStream("bin/etc/dailypage.json");
            JsonArray jsonArray = parser.parse(new InputStreamReader(in,"UTF-8")).getAsJsonArray();
            String sql="insert into dailypage (id,detail) values (?,?)";
            for (int id = 1; id <= jsonArray.size(); id++) {
                template.update(sql, id, jsonArray.get(id - 1).toString());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
