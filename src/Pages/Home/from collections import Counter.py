from collections import Counter
arr= [0,1,1,1,2,2]

freq={}

for i in arr:
    if(i not in freq):
        freq[i]=1
    else:
        freq[i]+=1
print(freq)

a2 = Counter(arr)


        