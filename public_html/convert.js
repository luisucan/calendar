/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
public class Convertidor {
    public static final List<String> LISTA_TIPO_DATOS  = Arrays.asList("INT");
    
    ///function convert to json 
    public JsonArray convertirAJSON(ResultSet resultados)throws Exception{
        JsonArray lista = new JsonArray();
        int total_rows = 0;
        JsonObject obj;
        while(resultados.next()){
            total_rows = resultados.getMetaData().getColumnCount();
            obj = new JsonObject();
            for (int i = 0; i < total_rows; i++) {
                try{
                    add(resultados,(i+1), obj);
                }catch(Exception ex){}
            }
            lista.add(obj);
        }
        return lista;
    }
    private void add(ResultSet rs,int index,JsonObject obj)throws Exception{
        int idx = LISTA_TIPO_DATOS.indexOf(rs.getMetaData().getColumnTypeName(index));
        
        if(idx == 0){
            obj.addProperty(
                rs.getMetaData().getColumnLabel(index),
                rs.getInt(index)
            );
        }else{
            obj.addProperty(
                rs.getMetaData().getColumnLabel(index),
                rs.getString(index)
            );
        }
    }
    public static String convertirAXML(ResultSet resultSet)throws Exception {
        StringBuffer xmlArray = new StringBuffer("<xml>");
        int total_rows = 0;
        while (resultSet.next()) {
            total_rows = resultSet.getMetaData().getColumnCount();
            xmlArray.append("<data");
            for (int i = 0; i < total_rows; i++) {
                xmlArray.append("<")
                        .append(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase())
                        .append(">")
                        .append(resultSet.getObject(i + 1))
                        .append("</")
                        .append(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase())
                        .append(">"); 
            }
            xmlArray.append("<data/>");
        }
        xmlArray.append("</xml>");
        return xmlArray.toString();
    }
}
*/