package bin.test;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import jdbc.jdbcUtils.JdbcUtils;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.Map;

public class TestGet {

    /*private  static int number_Enword=3;
    private  static int startNumber=2;
    private  static String EnglishLevel="cet4";
    private static JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());


    public static void main(String[] args) {
        System.out.println(getNumber());
    }

    private static String getLevel() {
        JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());

        String openid = "ttttemp001";
        String sql = "select EnglishLevel from user where openid=?";
        Map map = new HashMap();
        map = template.queryForMap(sql, openid);
        System.out.println(map.get("EnglishLevel"));
        return map.get("EnglishLevel").toString();
    }

    private static String getWords() {
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

        for (int i = 0; i < number_Enword; i++) {
            id = (startNumber + i) % total + 1;
            Map map = template.queryForMap(sql, id);
            jsonArray.add(map.get("word").toString());
        }

        return gson.toJson(jsonArray);
    }
    private static int getNumber(){
        String sql = "select number_Enword from user where openid=?";
        String openid = "ttttemp001";
        Map map = template.queryForMap(sql, openid);
        System.out.println(map.get("number_Enword"));
        return Integer.parseInt(map.get("number_Enword").toString());
    }*/

}
