
目前可以使用的API
------------
託管服務：Firebase cloud functions
```
https://us-central1-fir-project-85d2e.cloudfunctions.net/
```

## 成員相關
* 設定成員基本資訊
```
/menber_setup?email=test1@test.com&password=test&interests=test&occupation=test&intorduction=test&neckname=Hank
  ```
* 檢索特定成員的資訊 
```
/menber_quary?user_id=Dl7EAom5PhDCVyqmwZoaCf7L5BsRv3
```
## 讀書會相關
* 設定社團基本資訊
```
/group_setup/?type=&name=測試&flag=[測試]&location=測試地點&time=測試時間&frequency=測試頻率&organizer=主持人&co_organizer=[協辦人1號,協辦人2號]&picture=測試圖片.jpg&discription=這是用來說明的測試&expect_num=100000  
  ```
* 檢索特定社團的資訊 
```
/group_quary/?group_id=DgpXTGt6MnSA7HJruLi4qqghDwrDvS
```
## 讀書會類別相關
根據設計師的圖，先設定十個類別  
未來可以依據它進行增減

```
["商業經營", "投資理財", "藝術設計", "生活體驗", "社會文學", "心理勵志", "語言學習", "資訊科技", "考試衝刺", "組隊競賽"]
```
* /interests?mode=quary                      //索引全部的類別
* /interests?mode=add&name=投資理財          //新增類別
* /interests?mode=delete&name=投資理財       //刪除指定類別
* /interests?mode=recover                   //初始化回最原始的類別(共10種)
  
# To do
- [x] build basic menber data form
- [x] build basic menber group form
- [] create the flag on the organizer
- [] build the API to add / delete people to a specific group  