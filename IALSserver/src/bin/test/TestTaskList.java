package bin.test;

import bin.com.TaskList;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

public class TestTaskList {
    public static void main(String[] args) throws FileNotFoundException {
        JsonParser parser=new JsonParser();
        JsonObject jsonObject=(JsonObject) parser.parse(new FileReader("H:/temp.json"));
        System.out.println("openid="+jsonObject.get("openid").getAsString());

        System.out.println(jsonObject.get("task"));
        JsonArray array=jsonObject.get("task").getAsJsonArray();


        TaskList taskList = new TaskList(array);
        System.out.println(taskList.getTaskList());

    }
}
