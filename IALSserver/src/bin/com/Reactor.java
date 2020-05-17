package bin.com;

import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

public  class Reactor extends HttpServlet {


    private String openid;

    private String queryString;

    private JsonObject query;
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        String initialData=req.getQueryString();

        if (initialData==null){
            fail(resp.getWriter(),"query string ==null");
            return;
        }

        queryString = URLDecoder.decode(initialData, "utf-8");

        System.out.println(queryString);

        initOpenid(resp);

//        System.out.println(openid);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        String initialData=getPostData(req);
        if (initialData == null) {
            this.fail(resp.getWriter(), "queryString==>NULL");
            return;
        }
        queryString = URLDecoder.decode(initialData, "utf-8");

        System.out.println(queryString);
        initOpenid(resp);

    }


    private void initOpenid(HttpServletResponse resp) throws IOException {

        if (queryString == null) {
            this.fail(resp.getWriter(), "queryString==>NULL");
            return;
        }
        query = new TransFormat().queryString2jsonObject(queryString);
        openid = query.get("openid").getAsString();

        if (!new User(openid).registered()) {
            new User(openid).register();
        }

    }

    public void fail(PrintWriter out, String reason){
        out.print("mission failed:"+reason);
        System.out.println("mission failed:"+reason);
        out.flush();
        out.close();
    }





    /**
     * getter
     * setter
     **/

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public JsonObject getQuery() {
        return query;
    }

    private static String getPostData(HttpServletRequest request) {
        StringBuffer data = new StringBuffer();
        String line = null;
        BufferedReader reader = null;
        try {
            reader = request.getReader();
            while (null != (line = reader.readLine())) {
                data.append(line);
            }
        } catch (IOException e) {
        } finally {
        }
        return data.toString();
    }
}
