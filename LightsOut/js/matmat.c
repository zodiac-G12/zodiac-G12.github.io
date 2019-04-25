#include <stdio.h>

int main(void){
    int i, j, k, l, flag=0, count=1; //counter
    int n, ans; //size of matrix

    puts("Please input size.(n>=3)");
    scanf("%d",&n);
    if(n<3) return -1;

    //Making I_n
    int inv[n*n][n*n];
    int e[n*n][n*n];
    int tmp_e[n*n]; //maybe not necessary
    int tmp_i[n*n]; // maybe not necessary
    int now[n*n];
    for(i=0;i<n*n;i++){
        tmp_e[i]=0;
        tmp_i[i]=0;
        now[i]=0;
        for(j=0;j<n*n;j++){
            if(i==j){
                inv[i][j]=1;
                e[i][j]=1;
            }else{
                inv[i][j]=0;
                e[i][j]=0;
            }
        }
    }

    //Making expansion adjacent matrix(E_n)
    for(i=0;i<n*n;i++){
        if(i>=n)        e[i][i-n]=1;
        if(i%n!=0)      e[i][i-1]=1;
        if((i+1)%n!=0)  e[i][i+1]=1;
        if(i<n*n-n)     e[i][i+n]=1;
    }

    puts("E_n:");
    for(i=0;i<n*n;i++){
        for(j=0;j<n*n;j++) printf("%d ", e[i][j]);
        puts("");
    }

    //Making inverse matrix(E_n^-1)

    for(count=0;count<100;count++){
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++){
                if(i!=j&&e[i][j]!=0){ //i==j must be 1
                    if(j<i){ //from now to top at bottom, 
                        //単位行列左斜め上1..1右斜め下より下側
                        //e[j][0~n*n](上)はもう単位行列の準備が出来ているとする
                        for(k=0;k<n*n;k++){
                            e[i][k]=(e[i][k]+e[j][k])&1;
                            inv[i][k]=(inv[i][k]+inv[j][k])&1;
                        }
                    }else{ //j>i, from now
                        //単位行列左斜め上1..1右斜め下より上側
                        //e[j](下)はまだ単位行列の準備が出来ていないとする
                        //e[0~i-1][0~n*n](上)はもう単位行列の準備が出来ているとする
                        for(k=i+1;k<n*n;k++){
                            if(e[k][j]==1){
                                for(l=0;l<j&&e[k][l]!=1;l++);
                                if(l==j){
                                    for(l=0;l<n*n;l++){
                                        e[i][l]=(e[i][l]+e[k][l])&1;
                                        inv[i][l]=(inv[i][l]+inv[k][l])&1;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        for(i=0;i<n*n;i++){
            if(e[i][i]!=1&&i!=n*n-1){
                for(l=0;l<n*n;l++){
                    tmp_e[l]=e[i][l];
                    tmp_i[l]=inv[i][l];
                    e[i][l]=e[i+1][l];
                    inv[i][l]=inv[i+1][l];
                    e[i+1][l]=tmp_e[l];
                    inv[i+1][l]=tmp_i[l];
                }
            }
        }
        for(flag=0,i=0;i<n*n&&flag==0;i++){
            for(j=0;j<n*n;j++){
                if((i==j&&e[i][j]!=1)||(i!=j&&e[i][j]!=0)){
                    flag=1;
                    break;
                }
            }
        }
        if(flag==0) break;
    }
    if(count<100){
        printf("count=%d",count);
        puts("\nE_n_after:");
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++) printf("%d ", e[i][j]);
            puts("");
        }
        puts("\nE_n^-1:");
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++) printf("%d ", inv[i][j]);
            puts("");
        }
    }else{
        puts("Maybe nothing.");
        return -1;
    }

    printf("n=%d, count=%d\n", n, count);
    puts("\nPlease input now.");
    for(i=0;i<n*n;i++){
        scanf("%d", &now[i]);
        if(now[i]!=0 && now[i]!=1) return -1;
    }

    puts("");
    for(i=0;i<n*n;i++){
        ans=0;
        for(j=0;j<n*n;j++){
            ans=(ans+(inv[i][j]*now[j])&1)&1;
        }
        printf("%d ", ans);
        if((i+1)%n==0) puts("");
    }
    puts("");

    return 0;
}
