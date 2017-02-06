import { PWrapper } from './hs.types';

export const fakemodel: PWrapper = {
        //things whose health we monitor
        patients: [
          {
            "name": "service1",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "FAIL",
                "details":"OMG that world hatz me "
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK",
                 "details":"Allcool"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "FAIL"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "FAIL"
              }
          ],
            "dependsOn": ["service1_a", "service1_b", "service1_c"],
            "description": "I am a broken service desc hhhhhhhhhhhhhhhhhhhhhhd ds dssssssssssssssssssss hhdssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss     dhhhsudgfyusdgfgdyuuhfiu"
        },
          {
            "name": "service1_a",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK",
                "details":"Allcool"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": ["service1_a_a", "service1_a_b", "service1_a_c"]
        },
          {
            "name": "service1_a_a",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": []
        }
//        {  /* Deliberatly missing dependancy  should flag an alert */
//          "name": "service1_a_b",
//          "statusHistory": [
//            {"timestamp": "16:37:33.803+1000", "status": "OK"}
//           ,{"timestamp": "16:37:34.803+1000", "status": "OK"}
//            ,{"timestamp": "16:37:35.803+1000", "status": "OK"}
//            ,{"timestamp": "16:37:36.803+1000", "status": "OK"}
//            ,{"timestamp": "16:37:37.803+1000", "status": "OK"}
//          ],
//          "dependsOn": []
//        }
          ,
          {
            "name": "service1_a_c",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "FAIL"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "FAIL"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": []
        }
        , {
            "name": "service1_b",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": []
        }
        , {
            "name": "service1_c",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": ["service1_c_a", "service1_c_b", "service1_c_c"]
        }
        , {
            "name": "service1_c_a",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": []
        }
        , {
            "name": "service1_c_b",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "FAIL"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": []
        }
        , {
            "name": "service1_c_c",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "FAIL"
              }
          ],
            "dependsOn": []
        }
        , {
            "name": "service2",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:10:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn":  []
        },
          {
            "name": "service3",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
               "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": ["service3_a", "service3_b"]
        },
          {
            "name": "service3_a",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
               "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": []
        },
          {
            "name": "service3_b",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
               "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
               "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
               "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn":  [] ,
            "metadata": {
              foo: "bar",
              "author": "Karl Roberts",
              "email": "Karl.roberts@owtelse.com"
            }
        },
           {
            "name": "service4000000000000000000999999999999999999999999999999999999999999999999999999999900000",
            "statusHistory": [
              {
                "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
                "timestamp": "2017-02-01T11:10:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn":  [],
            "metadata": {
              foo: "bar",
              "author": "Karl Roberts",
              "email": "Karl.roberts@owtelse.com"
            }
        } ,
          {
            "name": "M",
            "statusHistory": [
              {
               "timestamp": "2017-02-01T11:19:24.030872",
                "status": "OK"
              }
           , {
               "timestamp": "2017-02-01T11:20:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:21:24.030872",
                "status": "OK"
              }
            , {
               "timestamp": "2017-02-01T11:22:24.030872",
                "status": "OK"
              }
            , {
                "timestamp": "2017-02-01T11:23:24.030872",
                "status": "OK"
              }
          ],
            "dependsOn": [] ,
            "metadata": {
              foo: "bar",
              "author": "Karl Roberts",
              "email": "Karl.roberts@owtelse.com"
            }
        }
      ]
      } ;