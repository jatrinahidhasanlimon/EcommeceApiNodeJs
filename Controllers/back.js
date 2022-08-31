{     
    $lookup: {
                    from: 'clubs',
                    localField: 'club',
                    foreignField: '_id',
                    as: 'Club'
                }
    },
    // convert array of Club to object
    {
        $unwind: '$Club'
    },
    // filter
    {
        $match: {
            'Club.name': new RegExp('\Barcelona\*')
        }
    }
















    {
        $match: { 
            $and : [
                    {
                        $or: [
                            {
                            'Club._id' : {
                                $in: [
                                mongoose.Types.ObjectId('630b4f1408e80aab62e20ffc'), 
                                ]    
                            },
                        },
                    ]
                
                } 
            ]
        }
    }