//
//  TimesTableViewCell.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/3.
//

import UIKit

class TimesTableViewCell: UITableViewCell {

    
    var timesStr:String?
    var clickHandle:((String) -> Void)?
    @IBOutlet weak var timesButton:UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    @IBAction func clickButton(_ sender:UIButton) {
        if let timesStr  = timesStr {
            clickHandle?(timesStr)
            
        }
    }
    
}
