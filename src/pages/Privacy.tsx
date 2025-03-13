
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background flex flex-col items-center p-4 overflow-hidden">
      <div className="w-full max-w-3xl my-8">
        <div className="mb-6">
          <Link to="/login">
            <Button variant="ghost" className="group flex items-center gap-2 hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>返回登录</span>
            </Button>
          </Link>
        </div>
        
        <Card className="rounded-2xl shadow-xl border-0 tiffany-shadow animate-fade-in overflow-hidden backdrop-blur-sm">
          <CardHeader className="space-y-1 px-5 py-5 sm:px-6 bg-primary/5">
            <CardTitle className="text-2xl font-bold brand-text-gradient">腾目科技 - 隐私政策</CardTitle>
            <CardDescription>
              我们如何收集、使用和保护您的个人信息
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-5 sm:px-6 py-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. 信息收集</h2>
              <p className="text-muted-foreground">
                腾目科技网络有限公司（以下简称"腾目科技"、"我们"）高度重视用户隐私保护，并严格遵守相关法律法规。本隐私政策旨在向您说明我们如何收集、使用、存储和分享您的个人信息，以及您享有的相关权利。
              </p>
              <p className="text-muted-foreground">
                我们可能收集的信息包括：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>您提供的个人身份信息（如姓名、电子邮件、电话号码等）</li>
                <li>账户信息（如用户名、密码、账户偏好等）</li>
                <li>交易信息（如订单、支付明细等）</li>
                <li>设备信息（如IP地址、设备型号、操作系统等）</li>
                <li>使用记录（如访问时间、停留时长、操作记录等）</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. 信息使用</h2>
              <p className="text-muted-foreground">
                我们使用您的个人信息主要用于以下目的：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>提供、维护和改进我们的服务</li>
                <li>处理您的交易和支付</li>
                <li>发送服务通知和更新</li>
                <li>客户支持和响应您的请求</li>
                <li>预防和解决欺诈、安全或技术问题</li>
                <li>根据法律法规要求披露或使用信息</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. 信息共享与披露</h2>
              <p className="text-muted-foreground">
                除以下情况外，未经您的许可，我们不会向任何第三方分享您的个人信息：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>在获取您明确同意的情况下</li>
                <li>与我们的关联公司、服务提供商和业务合作伙伴共享，以便他们为我们提供服务</li>
                <li>为遵守法律、法规、法律程序或政府强制性要求</li>
                <li>在紧急情况下，为保护腾目科技、我们的用户或公众的安全</li>
                <li>在涉及合并、收购、资产出售或类似交易时转移信息</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. 信息安全</h2>
              <p className="text-muted-foreground">
                我们采取适当的技术和组织措施保护您的个人信息不被意外或非法破坏、丢失、篡改、未经授权访问、披露或使用。这些措施包括但不限于：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>数据加密存储和传输</li>
                <li>访问控制和认证机制</li>
                <li>定期安全评估和审计</li>
                <li>员工培训和保密协议</li>
              </ul>
              <p className="text-muted-foreground">
                尽管我们采取了这些措施，但请注意，互联网传输不能保证100%的安全性。我们不能保证您的信息在传输过程中或存储在我们系统中时绝对安全。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. 您的权利</h2>
              <p className="text-muted-foreground">
                根据适用的数据保护法，您对自己的个人信息拥有以下权利：
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
                <li>访问权：您有权获知我们是否处理您的个人信息，以及请求访问这些信息</li>
                <li>更正权：您有权要求更正不准确的个人信息</li>
                <li>删除权：在某些情况下，您有权要求删除您的个人信息</li>
                <li>处理限制权：在某些情况下，您有权限制我们处理您的个人信息</li>
                <li>数据可携带权：在技术可行的情况下，您有权以结构化、常用和机器可读的格式接收您的个人信息，并将其传输给另一个数据控制者</li>
                <li>反对权：在某些情况下，您有权反对处理您的个人信息</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. Cookie和类似技术</h2>
              <p className="text-muted-foreground">
                我们使用Cookie和类似技术收集和存储有关您与我们服务互动的信息。这些技术帮助我们记住您的偏好、分析服务使用情况、个性化您的体验，以及提供定向广告。
              </p>
              <p className="text-muted-foreground">
                您可以通过浏览器设置管理或禁用Cookie，但这可能会影响某些服务功能的可用性或表现。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. 儿童隐私</h2>
              <p className="text-muted-foreground">
                我们的服务不面向16岁以下的儿童。我们不会故意收集16岁以下儿童的个人信息。如果我们得知已收集了儿童的个人信息，我们将采取措施尽快删除这些信息。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. 隐私政策的变更</h2>
              <p className="text-muted-foreground">
                我们可能会不时更新本隐私政策。当我们对隐私政策作出重大变更时，我们会通过在网站上发布新的隐私政策或通过其他渠道（如电子邮件通知）来通知您。
              </p>
              <p className="text-muted-foreground">
                我们鼓励您定期查看本隐私政策，以便了解我们如何保护您的信息。
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. 联系我们</h2>
              <p className="text-muted-foreground">
                如果您对本隐私政策有任何疑问、意见或请求，请联系我们：
              </p>
              <p className="text-muted-foreground">
                电子邮件：privacy@tengmu.com<br />
                电话：+86 10-12345678<br />
                地址：中国北京市海淀区中关村科技园区
              </p>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground">更新日期：2023年12月1日</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8 text-xs text-foreground/50">
          <p>腾目科技网络有限公司 © {new Date().getFullYear()} 版权所有</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
