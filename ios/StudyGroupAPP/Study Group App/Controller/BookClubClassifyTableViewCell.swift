//
//  BookClubClassifyTableViewCell.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/4.
//

import UIKit

class BookClubClassifyTableViewCell: UITableViewCell {
    var buttonHandel:((String?) -> Bool)?
    
    
    @IBOutlet weak var leftButton: UIButton!
    @IBOutlet weak var rightButton: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    @IBAction func clickButton(_ sender: UIButton) {
        
        if buttonHandel != nil {
            if sender.currentTitle != nil {
                sender.isSelected  = buttonHandel!(sender.currentTitle!)
            }
            
            if sender.isSelected {
                sender.layer.borderWidth = 3
                sender.layer.borderColor = CGColor.init(red: 85/255, green: 90/255, blue: 207/255, alpha: 1)
                
                
                
            }
            else {
                sender.layer.borderWidth = 0
            }
            
        }
    }
}
