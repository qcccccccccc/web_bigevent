$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
         repwd:function(value){
            let pwd = $('#ppwwdd').val()
            if(pwd !== value){
                return '两次密码不一致'
            }
         } 
    })
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        //2.发起ajax请求
        $.post('/api/reguser',
        {username:$('#yhm').val(),password:$('#ppwwdd').val()},function(res){
            if (res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功,请登录')
            $('#link_login').click()
        })
    })
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data: $(this).serialize(),
            success:function(res){
                if (res.status !== 0){
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                //将登陆成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})