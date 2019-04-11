#include <stdio.h>

int main(void){
    int i, j, k, l, m, o, count; //counter
    int n, ans; //size of matrix

    puts("Please input size.(n>=3)");
    scanf("%d",&n);
    if(n<3) return -1;

    //Making I_n
    int inv[n*n][n*n];
    int e[n*n][n*n];
    int tmp_e[n*n];
    int tmp_i[n*n];
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
        for(j=0;j<n*n;j++){
            if(i>=n)        e[i][i-n]=1;
            if(i%n!=0)      e[i][i-1]=1;
            if((i+1)%n!=0)  e[i][i+1]=1;
            if(i<n*n-n)     e[i][i+n]=1;
        }
    }

    puts("E_n:");
    for(i=0;i<n*n;i++){
        for(j=0;j<n*n;j++) printf("%d ", e[i][j]);
        puts("");
    }

    //Making inverse matrix(E_n^-1)
    for(count=0;count<10;count++){
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++){
                if(i!=j && e[i][j]!=0){
                    for(k=0;k<n*n;k++){
                        if(k!=i && e[k][j]!=0 && e[i][j]!=0){
                            for(m=0,o=0;m<j;m++) if(e[k][m]==1) o++;
                            if(o==0){
                                for(l=0;l<n*n;l++){
                                    e[i][l]=(e[i][l]+e[k][l])&1;
                                    inv[i][l]=(inv[i][l]+inv[k][l])&1;
                                }
                            }
                        }
                        if(e[i][j]!=1) break;
                    }
                }
            }
        }
        for(i=0,k=0;i<n*n;i++){
            for(j=0;j<n*n;j++){
                if(e[i][j]==1) k++;
            }
        }
        if(k==n*n) break;
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++){
                if((i==j && e[i][j]!=1)||(i!=j && e[i][j]!=0)){
                    for(k=0;k<n*n;k++){
                        tmp_e[k]=e[i][k];
                        tmp_i[k]=inv[i][k];
                    }
                    for(l=0;l<n*n;l++){
                        if(e[l][i]==1){
                            for(m=0;m<n*n;m++){
                                e[i][m]=e[l][m];
                                inv[i][m]=inv[l][m];
                                e[l][m]=tmp_e[m];
                                inv[l][m]=tmp_i[m];
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    if(count<10){
        puts("\nE_n^-1:");
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++) printf("%d ", inv[i][j]);
            puts("");
        }
    }else{
        puts("Maybe nothing.");
        return -1;
    }

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
