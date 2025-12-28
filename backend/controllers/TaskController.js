import Task from "../models/Task.js";
 

// post,update,delete 
export const getTask=async(req,res)=>{
           try{
                const tasks= await Task.find();
                res.status(200).json(tasks);
                console.log("Tasks fetched successfully");
           }
           catch(error){ 
                console.log("Error fetching tasks:", error);
                res.status(500).json({message:'Error fetching tasks',error});
           }
}

export const createTask= async (req,res)=>{
          const {title,description}=req.body;
            try {
               const newTask =new Task({title,description});
               await newTask.save();
               res.status(201).json({message:'Task created successfully',task:newTask});
            } catch (error) {
                res.status(500).json({message:'Error creating task',error});
            }
}
export const updateTask=async (req,res)=>{
         const {id}=req.params;
         const {title,description}=req.body;
         try {
            const updatedTask = await Task.findByIdAndUpdate(id, {title,description},{new:true});
            if(!updatedTask){
                return res.status(404).json({message:'Task not found'});
            }
            res.status(200).json({message:'Task updated successfully',task:updatedTask});
         } catch (error) {
             res.status(500).json({message:'error updating task try letter',error});
         }
}
export const deleteTask=async (req,res)=>{
       const {id}=req.params;
       try {
          const deletedTask = await Task.findByIdAndDelete(id);
          if(!deletedTask){
              return res.status(404).json({message:'Task not found'});
          }
          res.status(200).json({message:'Task deleted successfully',task:deletedTask});
       } catch (error) {
           res.status(500).json({message:'error deleting task try letter',error});
       }
}
 