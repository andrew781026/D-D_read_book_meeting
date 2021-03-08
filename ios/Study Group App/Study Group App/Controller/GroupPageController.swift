//
//  GroupPageController.swift
//  Study Group App
//
//  Created by Tiff Yang on 2021/2/24.
//  Copyright © 2021 Tiffany Yang. All rights reserved.
//

import UIKit
class GroupPageController: UIViewController {
    
    @IBOutlet weak var collectionView: UICollectionView!
    override func viewDidLoad() {
        super.viewDidLoad()
        let nib = UINib(nibName: "MembersCollectionViewCell", bundle: nil)
        self.collectionView.register(nib, forCellWithReuseIdentifier: "MembersCollectionViewCell")
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
}
extension GroupPageController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 20
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
         let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MembersCollectionViewCell", for: indexPath)
        cell.backgroundColor = .white
        return cell
    }
    
   
}
