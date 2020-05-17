package jdbc.jdbcDemo;


import jdbc.jdbcUtils.JdbcUtils;
import org.junit.Test;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class JdbcTemplateDemo2 {

    //Junit单元测试，可以让方法独立执行


    //1. 获取JDBCTemplate对象
    private JdbcTemplate template = new JdbcTemplate(JdbcUtils.getDataSource());
    /**
     * 1. 修改1号数据的 salary 为 10000
     */
    /*@Test
    public void test1(){

        //2. 定义sql
        String sql = "update user set name = ? where id = ?";
        //3. 执行sql
        int count = template.update(sql,"aaaaaaa",1);
        System.out.println(count);
    }*/

    /**
     * 2. 添加一条记录
     */
//    @Test
//    public void test2(){
//        System.out.println(template);
//        String sql = "insert into temp(id,name) values(?,?)";
//        int count = template.update(sql, 1015, "郭靖");
//        System.out.println(count);
//
//    }

    /**
     * 3.删除刚才添加的记录
     *//*
    @Test
    public void test3(){
        String sql = "delete from emp where id = ?";
        int count = template.update(sql, 1015);
        System.out.println(count);
    }

    *//**
     * 4.查询id为1001的记录，将其封装为Map集合
     * 注意：这个方法查询的结果集长度只能是1
     *//*
    @Test
    public void test4(){
        String sql = "select * from emp where id = ? or id = ?";
        Map<String, Object> map = template.queryForMap(sql, 1001,1002);
        System.out.println(map);
        //{id=1001, ename=孙悟空, job_id=4, mgr=1004, joindate=2000-12-17, salary=10000.00, bonus=null, dept_id=20}

    }

    *//**
     * 5. 查询所有记录，将其封装为List
     *//*
    @Test
    public void test5(){
        String sql = "select * from emp";
        List<Map<String, Object>> list = template.queryForList(sql);

        for (Map<String, Object> stringObjectMap : list) {
            System.out.println(stringObjectMap);
        }
    }


    *//**
     * 6. 查询所有记录，将其封装为Emp对象的List集合
     *//*

    @Test
    public void test6_2(){
        String sql = "select * from emp";
        List<Emp> list = template.query(sql, new BeanPropertyRowMapper<Emp>(Emp.class));
        for (Emp emp : list) {
            System.out.println(emp);
        }
    }

    *//**
     * 7. 查询总记录数
     *//*

    @Test
    public void test7(){
        String sql = "select count(id) from emp";
        Long total = template.queryForObject(sql, Long.class);
        System.out.println(total);
    }*/

}
