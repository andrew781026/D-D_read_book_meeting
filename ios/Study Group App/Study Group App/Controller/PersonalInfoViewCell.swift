//
//  PersonalInfoViewCelll.swift
//  Study Group App
//
//  Created by Tiff Yang on 2021/2/23.
//  Copyright © 2021 Tiffany Yang. All rights reserved.
//

import UIKit

class PersonalInfoViewCell: UITableViewCell {

    @IBOutlet weak var personalImageView: UIImageView!
    

    @IBOutlet weak var groupType: UILabel!
    
    @IBOutlet weak var location: UILabel!
    
    @IBOutlet weak var groupName: UILabel!
    
    @IBOutlet weak var date: UILabel!
    
    @IBOutlet weak var frequency: UILabel!
    
    @IBOutlet weak var numberOfPeople: UILabel!
    
    func update(with group: GroupsInfo) {
        personalImageView.image = group.groupPhoto
        groupType.text = group.typeOfGroup
        location.text = group.city
        groupName.text = group.nameOfGroup
        date.text = group.dateOfMeeting
        frequency.text = group.frequencyOfMeeting
        numberOfPeople.text = String(group.numberOfMembers)
    }
}
