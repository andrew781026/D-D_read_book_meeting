//
//  Create_Book_Club_2_ViewController.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/1.
//

import UIKit

class Create_Book_Club_2_ViewController: UIViewController {

    
    static var location:String?
    var timesStr:String?

    @IBOutlet var timesButton: UIButton!
    @IBOutlet var locationButton: UIButton!
    @IBOutlet var peopleNum: UILabel!
    @IBOutlet var nextStep: UIButton!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // button 圓角
        buttonReize( h :nextStep.frame.height,button: nextStep )
        // button 圓角
        buttonReize( h :timesButton.frame.height,button: timesButton )
        // button 圓角
        buttonReize( h :locationButton.frame.height,button: locationButton )
        
        // location setting
        locationButtonStyle()
        
        // times setting
        timesButtonStyle()
        
    }
    
    
    // locationButton style setting
    func locationButtonStyle(){
        if let location = Create_Book_Club_2_ViewController.location {
            
            locationButton.setTitle(location, for: .normal)
            locationButton.setTitleColor(.link, for: .normal)
            // locationButton.backgroundColor = .lightGray
           
        }
        else {
            locationButton.setTitle("請選擇聚會地點...", for: .normal)
        }
    }
    
    // timesButton style setting
    func timesButtonStyle(){
        if let timesStr = timesStr {
            
            timesButton.setTitle(timesStr, for: .normal)
            timesButton.setTitleColor(.link, for: .normal)
            // timesButton.backgroundColor = .lightGray
           
        }
        else {
            timesButton.setTitle("未知", for: .normal)
        }
    }
    
    
    // button 圓角
    func buttonReize( h : CGFloat, button : UIButton ) {
   
        button.layer.cornerRadius = h/4
    }

    @IBAction func countMinus(_ sender: UIButton) {
        let num:Int! = Int(peopleNum.text!)
        
        if num > 1 {
            peopleNum.text = String(num - 1)
        }
        
    }
    
   
    
    @IBAction func countPlus(_ sender: UIButton) {
        let num:Int! = Int(peopleNum.text!)
        
        if num < 1000 {
            peopleNum.text = String(num + 1)
        }
    }
    
    
    
}
