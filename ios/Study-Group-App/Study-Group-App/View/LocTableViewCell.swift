//
//  LocTableViewCell.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/3.
//

import UIKit
class LocTableViewCell: UITableViewCell {
    
    @IBOutlet weak var locationButton:UIButton!
    
    var index: Int?
    var completionHandler:((Int) -> Void)?
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }
    
    @IBAction func clickButton(_ sender:UIButton) {
        if let index = index{
            completionHandler?(index)
        }
        
        
    }
 
}

