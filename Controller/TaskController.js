import TaskModel from "../model/TaskModel.js";

/*Creation of Task */
export const TaskCreation = async (req, res) => {
    try {
        const { title, description, assigneduser, DueDate, completionStatus, Catagories } = req.body;

        const data = await new TaskModel({
            title: title,
            description: description,
            assigneduser: assigneduser,
            completionStatus: completionStatus,
            Catagories: Catagories
        });

        await data.save();
        res.status(200).json({"message":"Added Successfully"});
    } catch (error) {
        res.status(400).json({"message":"Something Went Wrong"});
        console.log(error);
    }
};

/*Getting All the Task*/
export const GetAllTask = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

        const validLimit = parseInt(limit, 10);
        if (isNaN(validLimit) || validLimit < 1 || validLimit > 100) {
            return res.status(400).json({ message: 'Invalid limit value (1-100)' });
        }
        const skip = (page - 1) * limit;

        const query = TaskModel.find({}, null, { sort: { [sort]: 1 } }) 
            .skip(skip)
            .limit(limit);

        const tasks = await query.exec();

        const totalTasks = await TaskModel.countDocuments();
        const totalPages = Math.ceil(totalTasks / limit);

        return res.status(200).json({
            data: tasks,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages,
            },
        });
    } catch (error) {
        console.log(error)
    }
}

/* Getting Single Task by Id*/
export const GetSingleTask = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await TaskModel.findById({ _id: id })
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

export const UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await TaskModel.findByIdAndUpdate(
            { _id: id },
            { completionStatus: "Done" },
            { new: true }
        )
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: "Task Updated" });
    } catch (error) {
        console.log(error);
    }
}

export const Catagories = async (req, res) => {
    try {
        const { Catagories } = req.body;
        const getwork = await TaskModel.find({ Catagories: Catagories });
        res.status(200).json(getwork);
    } catch (error) {
        console.log(error);
    }
}

/* Deleting Task by Id*/
export const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await TaskModel.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        return res.status(420).json("error Occurred");
    }
}

export const CompletedTask = async (req, res) => {
    try {
        const tasks = await TaskModel.find();

        const completedTasks = tasks.filter(task => task.completionStatus === "Done");
        const pendingTasks = tasks.filter(task => task.completionStatus !== "Done");

        res.status(200).json({ completedTasks, pendingTasks });
    } catch (error) {
        console.log(error);
    }
}

