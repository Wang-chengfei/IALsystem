package bin.com;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class TaskList {
    private ArrayList<Task> list;


    public TaskList(JsonArray initList){
        list = new ArrayList<Task>();
        for (int i=0;i<initList.size();i++){
//            System.out.println(i);
            list.add(new Task((JsonObject) initList.get(i)));
        }
        sortList();

    }

    public void sortList(){
        int max = 0;
        for (int i = 0; i < list.size()-1; i++) {
            max = i;
            for (int j = i + 1; j < list.size(); j++) {
                if(list.get(max).getTense()<list.get(j).getTense()){
                    max = j;
                }
            }
            Task temp=list.get(i);
            list.set(i, list.get(max));
            list.set(max, temp);
        }

    }

    public String getTaskList() {
        return new TransFormat().arrayList2json(list);
    }

}
