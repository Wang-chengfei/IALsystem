package bin.com;

import bin.test.TestUser;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import jdbc.jdbcUtils.JdbcUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.*;
import java.util.Map;

public class User {
    private String openid;
    private String EnglishLevel;
    private String name;
    private String selectedMotivation;

    public User(String openid){
        this.openid = openid;
    }
    public User (){    }

    public void register() throws FileNotFoundException {
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        try {
            this.initItemList(openid);
            this.initTaskList(openid);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        EnglishLevel = "cet4";
        name = "努力的人";
        selectedMotivation = "motivation1";
        String sql="insert into user (openid,name,EnglishLevel,selectedMotivation) values (?,?,?,?)";
        template.update(sql, openid, name, EnglishLevel, selectedMotivation);

    }

    private void initTaskList(String openid) throws FileNotFoundException, UnsupportedEncodingException {
        JsonParser parser=new JsonParser();
        InputStream in = TestUser.class.getClassLoader().getResourceAsStream("bin/etc/initTask.json");
        JsonArray jsonArray = parser.parse(new InputStreamReader(in,"UTF-8")).getAsJsonArray();
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        String sql = "insert into tasks (openid,task) values(?,?)";
        template.update(sql,openid, new Gson().toJson(jsonArray));
    }

    private void initItemList(String openid) throws FileNotFoundException, UnsupportedEncodingException {
        JsonParser parser=new JsonParser();
        InputStream in = TestUser.class.getClassLoader().getResourceAsStream("bin/etc/initItem.json");
        JsonArray jsonArray = parser.parse(new InputStreamReader(in,"UTF-8")).getAsJsonArray();
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        String sql = "insert into items (openid,item) values(?,?)";
        template.update(sql,openid, new Gson().toJson(jsonArray));
    }

    public Boolean registered() {
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        Gson gson = new Gson();

        String sql = "select count(*) from  user where openid = ?";

        Map<String, Object> map = template.queryForMap(sql,openid);
        if (Integer.parseInt(map.get("count(*)").toString())<1) {
            return false;
        } else {
            return true;
        }

    }

    public static void main(String[] args) {
        JsonParser parser=new JsonParser();
        InputStream in = TestUser.class.getClassLoader().getResourceAsStream("bin/etc/initItem.json");
        JsonArray jsonArray = parser.parse(new InputStreamReader(in)).getAsJsonArray();
        System.out.println(jsonArray.toString());
        System.out.println(new Gson().toJson(jsonArray));
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        String sql = "insert into items (openid,item) values(?,?)";
        template.update(sql,"safasda3333", jsonArray.toString());
        sql = "insert into items (openid,item) values(?,?)";
        template.update(sql,"safasda4444", new Gson().toJson(jsonArray));
    }

  /*  public void main(String args[]) throws FileNotFoundException{
        JsonParser parser=new JsonParser();
        JsonArray jsonArray = parser.parse(new FileReader("bin/etc/initItem.json")).getAsJsonArray();
        System.out.println(jsonArray.toString());
        System.out.println(new Gson().toJson(jsonArray));
    }*/

    /*@Test
    public static void main(String[] args) {
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
        Gson gson = new Gson();

        String s="temptry-05-03";
        String sql = "select count(*) from  user where openid = ?";
        Map<String, Object> map = template.queryForMap(sql,s);
        if (Integer.parseInt(map.get("count(*)").toString())<1) {
            System.out.println(1);
        } else {
            System.out.println(2);
        }

//        Map<String ,Object> map = template.queryForMap(sql,s);
//        System.out.println(map);
//        System.out.println(map.get("count(*)"));

    }*/

}
