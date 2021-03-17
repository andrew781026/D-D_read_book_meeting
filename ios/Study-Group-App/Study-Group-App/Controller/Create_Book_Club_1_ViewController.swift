//
//  Create_Book_Club_1_ViewController.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/4.
//

import UIKit

class Create_Book_Club_1_ViewController: UIViewController, UITableViewDataSource,UITableViewDelegate {
    
    struct bookClubClassify {
        var classify:(String)
        var isSelect:(Bool)
    }
    
    var bookClubClassifyArray:[bookClubClassify] = [
        bookClubClassify(classify: "A",isSelect: false),
        bookClubClassify(classify: "B",isSelect: false),
        bookClubClassify(classify: "C",isSelect: false),
        bookClubClassify(classify: "D",isSelect: false),
        bookClubClassify(classify: "E",isSelect: false),
       
    ]
    
    @IBOutlet weak var nextPageButton: UIButton!
    
    @IBOutlet weak var groupNameTextField: UITextField!
    
    
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let cellRow = bookClubClassifyArray.count + 1
        return cellRow / 2
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "BookClubList", for: indexPath ) as! BookClubClassifyTableViewCell
        
        
        let rowMax = bookClubClassifyArray.count
        // only leftButton
        if (indexPath.row * 2 + 2) == (rowMax + 1) {
            cell.leftButton.setTitle(bookClubClassifyArray[rowMax - 1].classify, for: .normal)
            cell.rightButton.setTitle(nil, for: .normal)
            cell.rightButton.backgroundColor = .white
            
        }
        else{
            let index = indexPath.row * 2
            cell.leftButton.setTitle(bookClubClassifyArray[index].classify, for: .normal)
            cell.rightButton.setTitle(bookClubClassifyArray[index+1].classify, for: .normal)
            
        }
        
        // button 圓角
        buttonReize(h: cell.leftButton.frame.height, button: cell.leftButton)
        buttonReize(h: cell.rightButton.frame.height, button: cell.rightButton)
        // color
        cell.leftButton.setTitleColor(.purple, for: .normal)
        cell.rightButton.setTitleColor(.purple, for: .normal)
        // button "selected" status
        cell.leftButton.setTitle(cell.leftButton.currentTitle, for: .selected)
        cell.rightButton.setTitle(cell.rightButton.currentTitle, for: .selected)
        cell.leftButton.setTitleColor(.purple, for: .selected)
        cell.rightButton.setTitleColor(.purple, for: .selected)
        
        
        
        
        cell.buttonHandel = { (str) in
            for  i in 0...self.bookClubClassifyArray.count {
                if self.bookClubClassifyArray[i].classify == str {
                    self.bookClubClassifyArray[i].isSelect = !self.bookClubClassifyArray[i].isSelect
                    return self.bookClubClassifyArray[i].isSelect
                }
            }
            
            return false
        }
        
        
        
        return cell
    }
    

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // button 圓角
        buttonReize(h: nextPageButton.frame.height, button: nextPageButton)
        // textfield 圓角
        textfiledResize(textfield: groupNameTextField)
        
        
        
    }
    
    // button 圓角
    func buttonReize( h : CGFloat, button : UIButton ) {
   
        button.layer.cornerRadius = h/3
    }
    // textfield 圓角
    func textfiledResize(textfield t:UITextField) {
        t.layer.cornerRadius = t.frame.height / 2
    }
    
    
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
