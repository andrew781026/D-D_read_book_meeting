//
//  ViewController.swift
//  Study Group App
//
//  Created by Tiff Yang on 2021/1/19.
//  Copyright © 2021 Tiffany Yang. All rights reserved.
//

import UIKit

class SearchViewController: UIViewController {

    @IBOutlet weak var tabBar: UITabBar!
    @IBOutlet weak var tableView: UITableView!
    private let groups = [GroupsInfo(typeOfGroup: "商業經營", city: "台北", nameOfGroup: "Group Name", dateOfMeeting: "時間未定", frequencyOfMeeting: "頻率未定", numberOfMembers: 0, groupPhoto: #imageLiteral(resourceName: "iOS")), GroupsInfo(typeOfGroup: "商業經營", city: "台北", nameOfGroup: "Group Name", dateOfMeeting: "時間未定", frequencyOfMeeting: "頻率未定", numberOfMembers: 0, groupPhoto: #imageLiteral(resourceName: "iOS")), GroupsInfo(typeOfGroup: "商業經營", city: "台北", nameOfGroup: "Group Name", dateOfMeeting: "時間未定", frequencyOfMeeting: "頻率未定", numberOfMembers: 0, groupPhoto: #imageLiteral(resourceName: "iOS")), GroupsInfo(typeOfGroup: "商業經營", city: "台北", nameOfGroup: "Group Name", dateOfMeeting: "時間未定", frequencyOfMeeting: "頻率未定", numberOfMembers: 0, groupPhoto: #imageLiteral(resourceName: "iOS")), GroupsInfo(typeOfGroup: "商業經營", city: "台北", nameOfGroup: "Group Name", dateOfMeeting: "時間未定", frequencyOfMeeting: "頻率未定", numberOfMembers: 0, groupPhoto: #imageLiteral(resourceName: "iOS")),]
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.dataSource = self
       
    }
}
extension SearchViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return groups.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let group = groups[indexPath.row]
        let cell = tableView.dequeueReusableCell(withIdentifier: "groupCell", for: indexPath) as! PersonalInfoViewCell
        cell.update(with: group)
        
        return cell
    }
    
}

