const main = ((n) => {
    var i, j, k, l, flag=0, count=1; //counter
    var n, ans; //size of matrix

    if(n<3) return -1;

    //Making I_n
    var inv=[];
    var e=[];
    var tmp_e=[]; //maybe not necessary
    var tmp_i=[]; // maybe not necessary
    var now=[];

    for(i=0;i<n*n;i++){
        tmp_e[i]=0;
        tmp_i[i]=0;
        now[i]=0;
        inv[i]=[];
        e[i]=[];
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

    process.stdout.write("E_n:\n");
    for(i=0;i<n*n;i++){
        for(j=0;j<n*n;j++) process.stdout.write(`${e[i][j]} `);
        process.stdout.write("\n");
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
        process.stdout.write(`count=${count}`);
        process.stdout.write("\nE_n_after:\n");
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++) process.stdout.write(`${e[i][j]} `);
            process.stdout.write("\n");
        }
        process.stdout.write("\nE_n^-1:\n");
        for(i=0;i<n*n;i++){
            for(j=0;j<n*n;j++) process.stdout.write(`${inv[i][j]} `);
            process.stdout.write("\n");
        }
    }else{
        process.stdout.write("Maybe nothing.\n");
        return -1;
    }

    process.stdout.write(`n=${n}, count=${count}\n`);
    process.stdout.write("\nPlease input now.\n");
    // for(i=0;i<n*n;i++){
    //     scanf("%d", &now[i]);
    //     if(now[i]!=0 && now[i]!=1) return -1;
    // }

    // puts("");
    // for(i=0;i<n*n;i++){
    //     ans=0;
    //     for(j=0;j<n*n;j++){
    //         ans=(ans+(inv[i][j]*now[j])&1)&1;
    //     }
    //     process.stdout.write("${ans} ");
    //     if((i+1)%n==0) process.stdout.write("\n");
    // }
    // process.stdout.write("\n");

    return 0;
})


for(var n=3,i=0,exist=[];n<30;n++){
    if(main(n)==0) exist[i++]=n;
}
console.log(exist);
