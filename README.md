# RestaurantList

* 可以註冊帳號
* 可以透過facebook登入
* 可以對餐廳名稱與類別進行搜尋
* 可以查看餐聽清單
* 可以觀看餐廳詳細資料
* 可以編輯餐廳資料
* 可以刪除餐廳資料
* 可以新增餐廳

# 環境建置與需求
* Node.js v10.15.0
* Nodemon v2.0.4
* Express v4.17.1
* Express-handlebars v5.1.0
* Bootstrap 
* Jquery v3.5.1
* Popper
* body-parse v0.1.0
* bcryptjs v4.2.3
* connect-glash v0.1.1
* dotenv v8.2.0
* express-session v1.17.1
* passport v0.4.1
* passport-facebook v3.0.0
* passport-local v1.0.0
# 安裝與執行步驟

  * 資料庫相關 
  
  安裝mongoDB  
  安裝Robo 3T  
  開啟mongoDB伺服器  
  連線到mongoDB伺服器  
  創建名為 users 的資料庫 

開啟終端機(Terminal)cd 到存放專案本機位置並執行:  

    $ git clone https://github.com/yongde2900/restaurantList.git   
至專案資料夾使用npm安裝套件

    $ cd restaurantList
    $ npm install

建立種子資料 

    $ npm run seed
使用nodemos開啟app.js

    $ npm run dev
成功開啟會出現以下訊息

    Express is running on http://localhost:3000
    
進入http://localhost:3000 即可使用本專案
