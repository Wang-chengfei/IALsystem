package bin.com;

public class RandomEnWordNumber
{
    private static int randomNumber;
    final static int MAX_INT=2100000000;

    static {
        randomNumber=(int) (Math.random()*MAX_INT);
        System.out.println("EnWord random initialized");
    }



    public static void fresh(){
        randomNumber=(int)(Math.random()*MAX_INT);
        System.out.println("EnWord random freshed");
    }



    public static int getRandomNumber(){
        return randomNumber;
    }


}
