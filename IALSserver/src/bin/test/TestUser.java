package bin.test;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

import java.io.*;

public class TestUser {
    public static void main(String[] args)throws FileNotFoundException {
        JsonParser parser=new JsonParser();
        File f = new File("src/bin/com/initTask.json");
        InputStream in = TestUser.class.getClassLoader().getResourceAsStream("bin/etc/initTask.json");

        JsonArray jsonArray = parser.parse(new FileReader(f)).getAsJsonArray();
        JsonArray jsonArray2 = parser.parse(new InputStreamReader(in)).getAsJsonArray();
        System.out.println(jsonArray.toString());
        System.out.println(new Gson().toJson(jsonArray));
        System.out.println(jsonArray2);
    }

}
