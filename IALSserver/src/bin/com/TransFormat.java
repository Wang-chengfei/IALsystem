package bin.com;

import bin.com.Task;
import com.google.gson.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class TransFormat {


    public  JsonArray map2jsonArray(Map<String,Object> map,String key){

        String temp=(String) map.get(key);

        JsonArray array = new JsonParser().parse(temp).getAsJsonArray();
        return array;

    }

    public  ArrayList jsonArray2arrayList(JsonArray jsonArray){

        ArrayList list = new ArrayList();
        for (int i=0;i<jsonArray.size();i++){
            System.out.println(i);
            list.add(new Task((JsonObject) jsonArray.get(i)));
        }
        return list;
    }


    public  String arrayList2json(ArrayList list) {
        Gson gson = new Gson();
        return gson.toJson(list);
    }

    public String queryString2json(String queryString) {
        StringTokenizer stringTokenizer = new StringTokenizer(queryString, "&");

        String couple ,key,value;
        Map map = new HashMap();

        while (stringTokenizer.hasMoreTokens()) {
            couple = stringTokenizer.nextToken();
            StringTokenizer st = new StringTokenizer(couple, "=");
            key=st.nextToken();
            value=st.nextToken();

            map.put(key, value);
        }
        Gson gson = new Gson();
        JsonObject jsonObject = new JsonParser().parse(gson.toJson(map)).getAsJsonObject();

//        String res = "{\"";
//
//        for (int i = 0; i < queryString.length(); i++) {
//            if (queryString.charAt(i) == '=') {
//                res += "\"" + ":" + "\"";
//            } else if (queryString.charAt(i) == '&') {
//                res += "\"" + "," + "\"";
//            } else {
//                res += queryString.charAt(i);
//            }
//        }
//        res += "\"" + "}";
//        return res;
        return gson.toJson(jsonObject);
    }
    public JsonObject queryString2jsonObject(String queryString) {
        StringTokenizer stringTokenizer = new StringTokenizer(queryString, "&");

        String couple ,key,value;
        Map map = new HashMap();

        while (stringTokenizer.hasMoreTokens()) {
            couple = stringTokenizer.nextToken();
            StringTokenizer st = new StringTokenizer(couple, "=");
            key=st.nextToken();
            value=st.nextToken();

            map.put(key, value);
        }
        Gson gson = new Gson();
        JsonObject jsonObject = new JsonParser().parse(gson.toJson(map)).getAsJsonObject();
        return jsonObject;
    }




}
