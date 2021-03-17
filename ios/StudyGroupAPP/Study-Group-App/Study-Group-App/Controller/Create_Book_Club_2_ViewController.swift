//
//  Create_Book_Club_2_ViewController.swift
//  Study-Group-App
//
//  Created by lu on 2021/3/1.
//

import UIKit

class Create_Book_Club_2_ViewController: UIViewController {


    @IBOutlet var timesButton: UIButton!
    @IBOutlet var locationButton: UIButton!
    @IBOutlet var peopleNum: UILabel!
    @IBOutlet var nextStep: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        // button 圓角
        buttonReize( h :nextStep.frame.height,button: nextStep )
        
        buttonReize( h :timesButton.frame.height,button: timesButton )
        
        buttonReize( h :locationButton.frame.height,button: locationButton )
        
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
