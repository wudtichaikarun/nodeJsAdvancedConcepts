# [NODE JS ADVANCED CONCEPTS](https://www.udemy.com/course/advanced-node-for-developers/learn/lecture/9636088#overview)

![nodeJs overview](/images/nodeJs_overview.png)

![nodeJs overview](/images/nodeJs_wrap.png)

> v8 For execute Javascript code outside the browser.

> libuv gives us access the file systems and networking and other staff.

> nodeJs gives us a nice interface to use Javascript.

---

![nodeJs overview](/images/nodeJs_C++.png)

# The basics of Threads

> Threads are units of instruction that are waiting to be executed by the CPU deciding which order to execute these threads in is referred to as scheduling. Scheduling is controlled by operating system, to ways of improving the rate at which we process threads is to either add more CPU core to our machine or to allow OS scheduler to detect big process in processing time due to expensive input and output operations.

- ### Process and Threads

  ![nodeJs overview](/images/process.png)
  ![nodeJs overview](/images/activity_monitor.png)

  - The Libuv Thread Pool

  > With Thread pool don't need to wait some Thread process, we can do other things inside the event loop.
  > ![nodeJs overview](/images/thread_pool.png)

Example from src/threads.js

- pendingOperations

  ```Javascript
  // result from: node src/threads.js
  4: 1333
  1: 1401
  2: 1428
  3: 1472
  5: 2152
  ```

  Why #5 took 3s ?
  ![nodeJs overview](/images/threads_result.png)

  Answer

  > 2 cores only able to process these two threads at the same time.
  > ![nodeJs overview](/images/threads_mb.png)

  ***

Example from src/async.js

- pendingOSTasks
  > ![nodeJs overview](/images/libuv_os_delegation.png)

> Note http module does not work with the thread pool.

---

### OS Scheduler

![nodeJs overview](/images/os_schedule.png)

> One core can process more than one threaded time through a process called multi-threading or you may have also heard it referred to as hyper threading

![nodeJs overview](/images/multi_threading.png)

---

### Clustering

- without cluster
  ![nodeJs overview](/images/without_cluster.png)

- with cluster
  ![nodeJs overview](/images/cluster_01.png)
  ![nodeJs overview](/images/cluster_02.png)

- make request to test index.js `cluster.fork()`

```
// ab = use apache benchmark
// localhost:3000/fast = to make request to localhost:3000/fast
// -n 500 = total of 500 request
// -c 50 = use a concurrency of 50 (50 requests at the same time)

> ab -c 50 -n 500 localhost:3000/fast
```

result

```
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Finished 500 requests


Server Software:
Server Hostname:        localhost
Server Port:            3000

Document Path:          /fast
Document Length:        14 bytes

Concurrency Level:      50
Time taken for tests:   0.431 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      106500 bytes
HTML transferred:       7000 bytes
Requests per second:    1160.06 [#/sec] (mean)
Time per request:       43.101 [ms] (mean)
Time per request:       0.862 [ms] (mean, across all concurrent requests)
Transfer rate:          241.30 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    2   4.2      0      24
Processing:    12   37  18.2     33     148
Waiting:       12   34  15.6     32     144
Total:         14   39  18.9     34     148

Percentage of the requests served within a certain time (ms)
  50%     34
  66%     42
  75%     46
  80%     48
  90%     55
  95%     64
  98%     98
  99%    140
 100%    148 (longest request)
```
