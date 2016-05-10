document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

   //alert('device ready');

var db = window.sqlitePlugin.openDatabase({name: 'car_data.db', location: 'default'});

   //------------------------CREATE Sql TABLES-----------------------------------------------//

  db.transaction(function (tx) {
    //tx.executeSql('DROP TABLE IF EXISTS car_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS car_table (id integer primary key, username text, email text, plate_num integer, points integer)');

    }, errorcb, successcb);

  function errorcb(err) {
     //alert('error in table' + err.code);
}

  function successcb() {
    
    //alert('success in table');
}

//------------------------READ FROM DBS-----------------------------------------------//

  db.transaction(function (tx) {
      tx.executeSql("SELECT * from car_table", [], function(tx, res) {
          var box = document.querySelector('#all_results'),
              result = res.rows.length; 

          for (var i = 0; i < result; i++) {

               dbsRecords = {
                        
                        users: res.rows.item(i).username,
                        emails: res.rows.item(i).email,
                        plates: res.rows.item(i).plate_num,
                        point: res.rows.item(i).points
                      }

               box.innerHTML = "<table>" + "<tr>" + "<td>" + dbsRecords.users + "</td>" + "<td>" + dbsRecords.emails + "</td>" + "<td>" + dbsRecords.plates + "</td>" + "<td>" + dbsRecords.point + "</td>" + "</tr>" + "</table>";
               
          }
      });

  });

  

//------------------------Register to Dbs-----------------------------------------------//

  var enter = document.querySelector('#butEnter');

  enter.onclick = function() {

    var userBox = document.querySelector('#userText'),
        emailBox = document.querySelector('#emailText'),
        plateBox = document.querySelector('#plateText');  

    var nameValue = userBox.value,
        emailValue = emailBox.value,
        plateValue = plateBox.value,
        numPoint = 0;

    db.transaction(function(tx) {

      tx.executeSql("INSERT INTO car_table (username, email, plate_num, points) VALUES (?,?,?,?)", [nameValue, emailValue, plateValue, numPoint]);


  }, errorcbk, successcbk);

  function errorcbk(err) {
     alert('error inserting' + err.code);

  }

  function successcbk() {
    
    alert('success inserting');

  }


 }

 //------------------------SEARCH FROM DBS-----------------------------------------------//

var searchBlock = document.querySelector('#search_block'),
     butSearch = document.querySelector('#but_search');

    butSearch.onclick = function() {

    //event.cancelBubble = true;
   //if(event.stopPropagation) event.stopPropagation();
    var searchUser = document.querySelector('#search_text'), 
        searchValue = searchUser.value;
     
    db.transaction(function (tx) {
           tx.executeSql("SELECT * from car_table where username like('%" + searchValue + "%')", [], function(tx, res) {
              var len = res.rows.length;
              for (var j = 0; j < len; j++) {
              var dataRes = res.rows.item(j).id + "  " + res.rows.item(j).username + "  " + res.rows.item(j).email + "  " + res.rows.item(j).plate_num + "  " +  res.rows.item(j).points;
              
                 searchBlock.innerHTML = dataRes;
 
             }
          });
        });
      }

//-------------------------Add Points to dbs------------------------//

var butAdd = document.querySelector('#add_points'),
    butMinus = document.querySelector('#less_points'),
    butDel = document.querySelector('#delete_user');


  butAdd.onclick = function() {

    var searchUser = document.querySelector('#search_text'), 
        addValue = searchUser.value;

  db.transaction(function (tx) {
           tx.executeSql("UPDATE car_table Set points = '3' where username like('%" + addValue + "%')", [], function(tx, rec) {
              var row = rec.rows.length;
              //--Do whatever here--//
          });
        });

 }

  butMinus.onclick = function() {

      var searchUser = document.querySelector('#search_text'), 
          minusValue = searchUser.value;

      db.transaction(function (tx) {
           tx.executeSql("UPDATE car_table Set points = '0' where username like('%" + minusValue + "%')", [], function(tx, datarec) {
              var lent = datarec.rows.length;
          });
        });

 }

 butDel.onclick = function() {

      var searchUser = document.querySelector('#search_text'),
          delValue = searchUser.value;

      db.transaction(function (tx) {
           tx.executeSql("DELETE FROM car_table where username like('%" + delValue + "%')", [], function(tx, resdata) {
              var dat = resdata.rows.length;
          });
        });

 }

 //-------------------------Reload App------------------------//

var butUp = document.querySelector('#but_update');

butUp.onclick = function() {

    window.location.reload(true);

}


}
  