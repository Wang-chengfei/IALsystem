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
import java.util.Map;

@WebServlet({"/load/item","/get/item"})
public class ItemReactor extends Reactor {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req,resp);


        if (super.getOpenid()==null){
            fail(resp.getWriter(),"openid==>null!");
            return;
        }
        String inf = null;

        try {
            inf = getItemsFromDB(super.getOpenid());
        } catch (Exception e) {
            e.getStackTrace();
        }

        if (inf==null) {
            fail(resp.getWriter(),"Can not find the item information of this openid!");
            return;
        }

        resp.setContentType("application/json");
        PrintWriter out = resp.getWriter();
        out.print(inf);
        out.flush();

        System.out.println(inf);
        out.close();


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req,resp);
        if (super.getOpenid()==null){
            fail(resp.getWriter(),"openid==>null!");
            return;
        }
//        System.out.println(super.getQuery());
//        System.out.println(super.getQuery().get("item"));
        String json=super.getQuery().get("item").getAsString();
//        System.out.println(json);
        PrintWriter out = resp.getWriter();

        if (new User(super.getOpenid()).registered()) {
            updateTaskList(super.getOpenid(), json);
            out.print(getItemsFromDB(super.getOpenid()));
        }else{
            out.print("client of this openid has newly registered");
        }

        out.flush();
        out.close();


    }

    private static String getItemsFromDB(String openid) {
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        Gson gson = new Gson();

        String sql = "select * from  items where openid = ?";
        Map<String, Object> map = template.queryForMap(sql,openid);

        if (map.size() < 1) {
            return null;
        }

        JsonArray initList=new TransFormat().map2jsonArray(map,"item");
        return gson.toJson(initList);
    }

    private static void updateTaskList(String openid,String newjson){
//        System.out.println(newjson);
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

        String sql = "UPDATE items SET item =? WHERE openid=?";
        int count = template.update(sql, newjson, openid);
//        System.out.println(count);

    }


}
