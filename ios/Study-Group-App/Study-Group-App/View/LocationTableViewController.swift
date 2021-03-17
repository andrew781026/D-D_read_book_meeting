//
//  LocationTableViewController.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/2.
//

import UIKit

class LocationTableViewController:
    UITableViewController {
    
    class LocTableViewCell: UITableViewCell {
        @IBOutlet  weak var location:UILabel!
        
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
    

    var locationArray : [String] = [
        "臺北市",
        "新北市",
        "基隆市",
        "桃園市",
        "新竹市",
        "新竹縣",
        "苗栗縣",
        "臺中市",
        "彰化縣",
        "南投縣",
        "雲林縣",
        "嘉義市",
        "嘉義縣",
        "臺南市",
        "高雄市",
        "屏東縣",
        "宜蘭縣",
        "花蓮縣",
        "臺東縣",
        "澎湖縣",
        "金門縣",
        "連江縣"
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("3")
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath:IndexPath) {
        
    }
    
    
    
    
    
    
    // MARK: - Table view data source
    
    // 返回選擇數量
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    // Table 有幾個rows
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return locationArray.count
    }

    // Configure the cell...
    // 設定 cell
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "LocationList", for: indexPath)

        cell.textLabel?.text = locationArray[indexPath.row]
        
        print(cell)

        return cell
    }
    

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
