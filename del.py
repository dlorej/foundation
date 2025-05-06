def findMedianSortedArrays(nums1, nums2):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :rtype: float
        """
        centre = (len(nums1) + len(nums2))/2
        print('centre',centre)
        index = 0
        i,j = 0,0
        save = None
        while index <= centre:
            if j >= len(nums2) or (i < len(nums1) and nums1[i] <= nums2[j]):
                store = nums1[i]
                print(store)
                i += 1
                index += 1
            else:
                store = nums2[j]
                print(store)
                j += 1
                index += 1
            if centre == index:
                print("store",store)
                save = store

        if save:
            return (save + store)/2
        else:
            return store

print(findMedianSortedArrays([2],[1,3]))