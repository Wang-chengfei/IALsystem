package bin.com;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import jdbc.jdbcUtils.JdbcUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@WebServlet({"/load/task","/get/task","/post/task"})
public class TaskReactor extends Reactor {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        super.doGet(req,resp);


        if (super.getOpenid()==null){
            fail(resp.getWriter(),"openid==>null!");
            return;
        }
        String inf = null;

        try {
            inf = getJsonList(super.getOpenid());
        } catch (Exception e) {
            e.getStackTrace();
        }

        if (inf==null) {
            fail(resp.getWriter(),"Can not find the task information of this openid!");
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
        System.out.println(super.getQuery());
        System.out.println(super.getQuery().get("task"));
//            JsonArray jsonArray= super.getQuery().get("task").getAsJsonArray();
//            String json = new Gson().toJson(jsonArray);
        String json=super.getQuery().get("task").getAsString();
        PrintWriter out = resp.getWriter();

        if (new User(super.getOpenid()).registered()) {
            updateTaskList(super.getOpenid(), json);
            out.print(getJsonList(super.getOpenid()));
        }else{
            out.print("client of this openid has newly registered");
        }

        out.flush();
        out.close();

    }
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        System.out.println("servlet初始化...");
    }


    private static String getJsonList(String openid){
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        Gson gson = new Gson();

        String sql = "select * from  tasks where openid = ?";
        Map<String, Object> map = template.queryForMap(sql,openid);

        if (map.size() < 1) {
            return null;
        }

//        JsonObject jsonObject = new JsonParser().parse(gson.toJson(map)).getAsJsonObject();
        JsonArray initList=new TransFormat().map2jsonArray(map,"task");
        TaskList taskList = new TaskList(initList);
        return taskList.getTaskList();

    }

    private static void updateTaskList(String openid,String newjson){
        System.out.println(newjson);
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

        String sql = "UPDATE tasks SET task =? WHERE openid=?";
        int count = template.update(sql, newjson, openid);
        System.out.println(count);

    }



//    public static void main(String[] args) {
//        System.out.println(getJsonList("temptry-05-03"));
//    }
//
//    @Test
//    public  void test1() {
//        String s = "openid=temptry-05-03";
//        JsonObject jsonObject = new TransFormat().queryString2jsonObject(s);
//        System.out.println(jsonObject);
//        System.out.println(jsonObject.get("openid").getAsString());
//    }



}
