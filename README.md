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

  - example from src/threads.js

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

### OS Scheduler

![nodeJs overview](/images/os_schedule.png)

> One core can process more than one threaded time through a process called multi-threading or you may have also heard it referred to as hyper threading

![nodeJs overview](/images/multi_threading.png)
